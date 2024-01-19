import { generateComponents } from "@uploadthing/react";

import type { uploadThingRouter } from "@/app/api/uploadthing/core";

export const { UploadButton, UploadDropzone, Uploader } =
  generateComponents<uploadThingRouter>();
