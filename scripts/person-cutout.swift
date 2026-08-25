import AppKit
import CoreImage
import ImageIO
import Vision

guard CommandLine.arguments.count == 3 else {
    fatalError("Usage: person-cutout.swift input.jpg output.png")
}

let inputURL = URL(fileURLWithPath: CommandLine.arguments[1])
let outputURL = URL(fileURLWithPath: CommandLine.arguments[2])
guard let data = try? Data(contentsOf: inputURL),
      let bitmap = NSBitmapImageRep(data: data),
      let cgImage = bitmap.cgImage else { fatalError("Unable to load input image") }

let request = VNGeneratePersonSegmentationRequest()
request.qualityLevel = .accurate
request.outputPixelFormat = kCVPixelFormatType_OneComponent8
let handler = VNImageRequestHandler(cgImage: cgImage, options: [:])
try handler.perform([request])
guard let maskBuffer = request.results?.first?.pixelBuffer else { fatalError("No person detected") }

let original = CIImage(cgImage: cgImage)
let rawMask = CIImage(cvPixelBuffer: maskBuffer)
let mask = rawMask.transformed(by: CGAffineTransform(
    scaleX: original.extent.width / rawMask.extent.width,
    y: original.extent.height / rawMask.extent.height
))
guard let filter = CIFilter(name: "CIBlendWithMask") else { fatalError("Mask filter unavailable") }
filter.setValue(original, forKey: kCIInputImageKey)
filter.setValue(CIImage(color: .clear).cropped(to: original.extent), forKey: kCIInputBackgroundImageKey)
filter.setValue(mask, forKey: kCIInputMaskImageKey)
guard let result = filter.outputImage,
      let output = CIContext().createCGImage(result, from: original.extent) else { fatalError("Unable to create output") }

guard let destination = CGImageDestinationCreateWithURL(outputURL as CFURL, "public.png" as CFString, 1, nil) else { fatalError("Unable to create destination") }
CGImageDestinationAddImage(destination, output, nil)
guard CGImageDestinationFinalize(destination) else { fatalError("Unable to save output") }
