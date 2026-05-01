import { CreateTaskMutationVariables } from 'src/gql/generated/createTask'
import * as yup from 'yup'

export const createTaskSchema: yup.ObjectSchema<CreateTaskMutationVariables> =
  yup.object().shape({
    data: yup.object().shape({
      name: yup.string().required().label('Task name'),
      description: yup.string().label('Task description'),
      content: yup.string().label('Detailed task content'),
      startDatePlaning: yup.date().label('Planned start date (ISO format)'),
      endDatePlaning: yup.date().label('Planned end date (ISO format)'),
      parentId: yup.string().label('Parent task ID for subtasks'),
    }),
  })
