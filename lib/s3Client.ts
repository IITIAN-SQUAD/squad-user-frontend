import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";

// Get AWS credentials from environment
const AWS_ACCESS_KEY_ID = process.env.NEXT_PUBLIC_AWS_ACCESS_KEY_ID;
const AWS_SECRET_ACCESS_KEY = process.env.NEXT_PUBLIC_AWS_SECRET_ACCESS_KEY;
const AWS_REGION = process.env.NEXT_PUBLIC_AWS_REGION || "ap-south-1";
const BUCKET_NAME = process.env.NEXT_PUBLIC_S3_BUCKET_NAME || "prod-image-bucket-2";

// Validate credentials
if (!AWS_ACCESS_KEY_ID || !AWS_SECRET_ACCESS_KEY) {
  console.error("❌ AWS Credentials Missing!");
  console.error("AWS_ACCESS_KEY_ID:", AWS_ACCESS_KEY_ID ? "✅ Set" : "❌ Missing");
  console.error("AWS_SECRET_ACCESS_KEY:", AWS_SECRET_ACCESS_KEY ? "✅ Set" : "❌ Missing");
  console.error("AWS_REGION:", AWS_REGION);
  console.error("S3_BUCKET_NAME:", BUCKET_NAME);
}

// Initialize S3 Client
const s3Client = new S3Client({
  region: AWS_REGION,
  credentials: {
    accessKeyId: AWS_ACCESS_KEY_ID || "",
    secretAccessKey: AWS_SECRET_ACCESS_KEY || "",
  },
});

/**
 * Upload a file to S3 and return the public URL
 */
export async function uploadToS3(
  file: File,
  folder: string = "profile-images"
): Promise<string> {
  try {
    // Check credentials before attempting upload
    if (!AWS_ACCESS_KEY_ID || !AWS_SECRET_ACCESS_KEY) {
      throw new Error(
        "AWS credentials not configured. Please add NEXT_PUBLIC_AWS_ACCESS_KEY_ID and NEXT_PUBLIC_AWS_SECRET_ACCESS_KEY to your .env.local file"
      );
    }

    // Generate unique filename
    const timestamp = Date.now();
    const randomString = Math.random().toString(36).substring(2, 15);
    const fileExtension = file.name.split(".").pop();
    const fileName = `${folder}/${timestamp}-${randomString}.${fileExtension}`;

    console.log("📤 Converting file to buffer...");
    // Convert File to ArrayBuffer for S3 SDK
    const arrayBuffer = await file.arrayBuffer();
    const buffer = new Uint8Array(arrayBuffer);

    // Prepare upload parameters
    const uploadParams = {
      Bucket: BUCKET_NAME,
      Key: fileName,
      Body: buffer,
      ContentType: file.type,
      // ACL: "public-read", // Uncomment if you want public read access
    };

    console.log("📤 Uploading to S3:", fileName);
    // Upload to S3
    const command = new PutObjectCommand(uploadParams);
    await s3Client.send(command);

    // Construct the S3 URL
    const region = process.env.NEXT_PUBLIC_AWS_REGION || "ap-south-1";
    const s3Url = `https://${BUCKET_NAME}.s3.${region}.amazonaws.com/${fileName}`;

    console.log("✅ File uploaded successfully:", s3Url);
    return s3Url;
  } catch (error: any) {
    console.error("❌ Error uploading to S3:", error);
    console.error("❌ Error details:", {
      message: error.message,
      name: error.name,
      stack: error.stack
    });
    throw new Error(`Failed to upload file: ${error.message}`);
  }
}

/**
 * Upload profile image to S3 with user-specific folder
 */
export async function uploadProfileImage(
  file: File,
  userId?: string
): Promise<string> {
  const folder = userId ? `profile-images/${userId}` : "profile-images";
  return uploadToS3(file, folder);
}

/**
 * Get S3 URL for a file (if you need to construct URLs)
 */
export function getS3Url(key: string): string {
  const region = process.env.NEXT_PUBLIC_AWS_REGION || "ap-south-1";
  return `https://${BUCKET_NAME}.s3.${region}.amazonaws.com/${key}`;
}
