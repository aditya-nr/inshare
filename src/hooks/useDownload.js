import { S3Client, GetObjectCommand } from "@aws-sdk/client-s3";

const AWS_S3_KEY_ID = process.env.NEXT_PUBLIC_KEY_ID;
const AWS_S3_KEY = process.env.NEXT_PUBLIC_KEY;
const AWS_S3_REGION = "ap-south-1"
const AWS_S3_BUCKET = "aditya-nr.in"


const client = new S3Client({
    region: AWS_S3_REGION,
    credentials: {
        accessKeyId: AWS_S3_KEY_ID,
        secretAccessKey: AWS_S3_KEY
    }
});

const useDownload = () => {
    const download = async (preSignedUrl, key, filename) => {
        try {
            const command = new GetObjectCommand({
                Bucket: AWS_S3_BUCKET,
                Key: key
            });
            const response = await client.send(command);

            // Convert the response Body to a Blob
            const buffer = await response.Body.transformToByteArray()
            const blob = new Blob([buffer]);

            // Create a temporary URL for the Blob
            const url = URL.createObjectURL(blob);

            // Create a temporary anchor element
            const anchor = document.createElement("a");
            anchor.href = url;
            anchor.download = filename;

            // Programmatically click the anchor element to trigger the download
            anchor.click();

            // Clean up
            URL.revokeObjectURL(url);

        } catch (error) {
            console.error('Error downloading file:', error);
        }
    };

    return download;
};

export default useDownload;
