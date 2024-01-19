import { createNextRouteHandler } from "uploadthing/next";

import { uploadThingRouter } from "./core";

// Export routes for Next App Router
export const { GET, POST } = createNextRouteHandler({
  router: uploadThingRouter,
});
