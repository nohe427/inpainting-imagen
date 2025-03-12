import { z } from 'zod';
import { InpaintingSchema } from './schemas/inpainting';
import fs from 'fs';

const lm =fs.readFileSync('images/londonMask.png');
const l = fs.readFileSync('images/london.jpg');

const lmE = Buffer.from(lm).toString('base64');
const lE = Buffer.from(l).toString('base64');

export const inpaintingSample: z.infer<typeof InpaintingSchema> = {
  instances: [
    {
      prompt: "Add a big red london bus",
      referenceImages: [
        {
          referenceType: "REFERENCE_TYPE_RAW",
          referenceId: 1,
          referenceImage: {
            bytesBase64Encoded: lE
          }
        },
        {
          referenceType: "REFERENCE_TYPE_MASK",
          referenceId: 2,
          referenceImage: {
            bytesBase64Encoded: lmE
          },
          maskImageConfig: {
            maskMode: "MASK_MODE_USER_PROVIDED",
            dilation: 0.1
          }
        },
      ]
    }
  ],
  parameters: {
    editConfig: {
      baseSteps: 35
    },
    editMode: "EDIT_MODE_INPAINT_INSERTION",
    sampleCount: 2,
  },
}
