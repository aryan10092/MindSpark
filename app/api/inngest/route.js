
import { serve } from "inngest/next";
  import { inngest } from "../../../inngest/client";
// import { createuser, helloWorld } from "../../../inngest/functions";
// import { inngest } from "@/inngest/client";
import { createuser, helloWorld,generatenotes } from "@/inngest/functions";

export const runtime='edge'

export const { GET, POST, PUT } = serve({
  
  client: inngest,
  streaming;'allow',
  functions: [
    helloWorld,
    createuser,
    generatenotes
  ],
});
