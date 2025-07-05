// Supabase Storage Setup Script
// This script creates storage buckets and sets up policies
// Run with: node setup-storage.js

const { createClient } = require("@supabase/supabase-js");
require("dotenv").config();

// Initialize Supabase client
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY; // Note: This requires a service role key, not the anon key

if (!supabaseUrl || !supabaseKey) {
  console.error(
    "Missing Supabase URL or service role key. Please check your .env file."
  );
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function setupStorage() {
  console.log("Setting up Supabase storage buckets...");

  try {
    // Create media bucket
    const { data: mediaBucket, error: mediaError } =
      await supabase.storage.createBucket("media", {
        public: false,
        fileSizeLimit: 10485760, // 10MB
        allowedMimeTypes: [
          "image/png",
          "image/jpeg",
          "image/gif",
          "image/webp",
        ],
      });

    if (mediaError) {
      console.error("Error creating media bucket:", mediaError.message);
    } else {
      console.log("Media bucket created or already exists");
    }

    // Create publications bucket
    const { data: publicationsBucket, error: publicationsError } =
      await supabase.storage.createBucket("publications", {
        public: false,
        fileSizeLimit: 52428800, // 50MB
        allowedMimeTypes: ["application/pdf"],
      });

    if (publicationsError) {
      console.error(
        "Error creating publications bucket:",
        publicationsError.message
      );
    } else {
      console.log("Publications bucket created or already exists");
    }

    // Create avatars bucket
    const { data: avatarsBucket, error: avatarsError } =
      await supabase.storage.createBucket("avatars", {
        public: false,
        fileSizeLimit: 2097152, // 2MB
        allowedMimeTypes: [
          "image/png",
          "image/jpeg",
          "image/gif",
          "image/webp",
        ],
      });

    if (avatarsError) {
      console.error("Error creating avatars bucket:", avatarsError.message);
    } else {
      console.log("Avatars bucket created or already exists");
    }

    const { data: assetsBucket, error: assetsError } =
      await supabase.storage.createBucket("assets", {
        public: false,
        fileSizeLimit: 2097152, // 2MB
        allowedMimeTypes: [
          "image/png",
          "image/jpeg",
          "image/gif",
          "image/webp",
        ],
      });

    if (assetsError) {
      console.error("Error creating assets bucket:", assetsError.message);
    } else {
      console.log("Assets bucket created or already exists");
    }
    // Set up bucket policies
    // Note: This is a simplified version. In the Supabase dashboard,
    // you can set up more granular policies for each bucket.

    console.log("Storage buckets setup complete!");
    console.log(
      "Please configure the following policies in the Supabase dashboard:"
    );
    console.log("1. Allow public read access to media bucket");
    console.log("2. Allow authenticated users to manage media bucket");
    console.log("3. Allow public read access to publications bucket");
    console.log("4. Allow authenticated users to manage publications bucket");
    console.log(
      "5. Allow users to read and write to their own avatar in avatars bucket"
    );
    console.log(
      "6. Allow users to read and write to their own assets in assets bucket"
    );
  } catch (error) {
    console.error("Unexpected error:", error.message);
  }
}

setupStorage()
  .then(() => console.log("Setup completed"))
  .catch((err) => console.error("Setup failed:", err));
