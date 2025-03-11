import { z } from 'zod';
import { InpaintingSchema } from './schemas/inpainting';

const inpaintingSample: z.infer<typeof InpaintingSchema> = {
  instances: [
    {
      prompt: "Add strawberries",
      referenceImages: [
        {
          referenceType: "REFERENCE_TYPE_RAW",
          referenceId: 1,
          referenceImage: {
            bytesBase64Encoded: "asd"
          }
        }
      ]
    }
  ],
  parameters: {
    editConfig: {
      baseSteps: 35
    },
    editMode: "EDIT_MODE_INPAINT_INSERTION",
    sampleCount: 4,
  },
}
