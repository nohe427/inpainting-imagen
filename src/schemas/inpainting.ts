import { z } from "zod"

export const InpaintingSchema = z.object({
  instances: z.array(
    z.object({
      prompt: z.string(),
      referenceImages: z.array(
        z.union([
          z.object({
            referenceType: z.string(),
            referenceId: z.number(),
            referenceImage: z.object({ bytesBase64Encoded: z.string() })
          }),
          z.object({
            referenceType: z.string(),
            referenceId: z.number(),
            referenceImage: z.object({ bytesBase64Encoded: z.string() }),
            maskImageConfig: z.object({
              maskMode: z.string(),
              dilation: z.number()
            })
          })
        ])
      )
    })
  ),
  parameters: z.object({
    editConfig: z.object({ baseSteps: z.number() }),
    editMode: z.string(),
    sampleCount: z.number()
  })
})

