import { formColProps6Config, IFormFieldConfig, ISelectOptions } from '@utils/form';
import { FormType } from '@/constants/form';

//
// export function searchUserFields(): IFormFieldConfig[] {
//   return [
//     {
//       id: 'name',
//       label: '사용자명',
//       ...formColProps6Config,
//       component: {
//         type: FormType.Input,
//         option: {
//           placeholder: '입력하세요'
//         }
//       }
//     }
//   ];
// }
//
// export function CreateUserFields(
//   projectSelect: ISelectOptions[],
//   userRoleSelect: ISelectOptions[]
// ): IFormFieldConfig<keyof IUserObj>[] {
//   return [
//     {
//       id: 'name',
//       label: '이름',
//       colProps: {
//         span: 24
//       },
//       formItemProps: {
//         labelCol: {
//           span: 5
//         },
//         wrapperCol: {
//           span: 19
//         },
//         children: null
//       },
//       component: {
//         type: FormType.Input,
//         option: {
//           placeholder: '입력하세요'
//         }
//       }
//     },
//     {
//       id: 'login',
//       label: '사용자ID',
//       colProps: {
//         span: 24
//       },
//       formItemProps: {
//         labelCol: {
//           span: 5
//         },
//         wrapperCol: {
//           span: 19
//         },
//         children: null
//       },
//       component: {
//         type: FormType.Input,
//         option: {
//           placeholder: '입력하세요'
//         }
//       }
//     },
//     {
//       id: 'password',
//       label: '패스워드',
//       colProps: {
//         span: 24
//       },
//       formItemProps: {
//         labelCol: {
//           span: 5
//         },
//         wrapperCol: {
//           span: 19
//         },
//         children: null
//       },
//       component: {
//         type: FormType.Input,
//         option: {
//           placeholder: '입력하세요'
//         }
//       }
//     },
//     {
//       id: 'email',
//       label: '이메일',
//       colProps: {
//         span: 24
//       },
//       formItemProps: {
//         labelCol: {
//           span: 5
//         },
//         wrapperCol: {
//           span: 19
//         },
//         children: null
//       },
//       component: {
//         type: FormType.Input,
//         option: {
//           placeholder: '입력하세요'
//         }
//       }
//     },
//     {
//       id: 'projectIds',
//       label: '프로젝트',
//       colProps: {
//         span: 24
//       },
//       formItemProps: {
//         labelCol: {
//           span: 5
//         },
//         wrapperCol: {
//           span: 19
//         },
//         children: null
//       },
//       component: {
//         option: {
//           multi: true
//         },
//         type: FormType.Select,
//         selectOptions: projectSelect
//       }
//     },
//     {
//       id: 'authorities',
//       label: '권한',
//       colProps: {
//         span: 24
//       },
//       formItemProps: {
//         labelCol: {
//           span: 5
//         },
//         wrapperCol: {
//           span: 19
//         },
//         children: null
//       },
//       component: {
//         option: {
//           multi: true
//         },
//         type: FormType.Select,
//         selectOptions: userRoleSelect
//       }
//     },
//     {
//       id: 'division',
//       label: '배분 여부',
//       colProps: {
//         span: 24
//       },
//       formItemProps: {
//         labelCol: {
//           span: 5
//         },
//         wrapperCol: {
//           span: 19
//         },
//         children: null
//       },
//       component: {
//         type: FormType.Radio,
//         selectOptions: useBooleanOpt
//       }
//     }
//   ];
// }
//
// export function DetailUserFields(
//   projectSelect: ISelectOptions[],
//   userRoleSelect: ISelectOptions[],
//   user: IUserObj
// ): IFormFieldConfig<keyof IUserObj>[] {
//   return [
//     {
//       id: 'name',
//       label: '이름',
//       colProps: {
//         span: 24
//       },
//       formItemProps: {
//         labelCol: {
//           span: 5
//         },
//         wrapperCol: {
//           span: 19
//         },
//         children: null
//       },
//       fieldOption: {
//         initialValue: user.name ? user.name : ''
//       },
//       component: {
//         type: FormType.Input,
//         option: {
//           placeholder: '입력하세요'
//         }
//       }
//     },
//     {
//       id: 'login',
//       label: '사용자ID',
//       colProps: {
//         span: 24
//       },
//       formItemProps: {
//         labelCol: {
//           span: 5
//         },
//         wrapperCol: {
//           span: 19
//         },
//         children: null
//       },
//       fieldOption: {
//         initialValue: user.login ? user.login : ''
//       },
//       component: {
//         type: FormType.Input,
//         option: {
//           disabled: true
//         }
//       }
//     },
//     {
//       id: 'projectIds',
//       label: '프로젝트',
//       colProps: {
//         span: 24
//       },
//       formItemProps: {
//         labelCol: {
//           span: 5
//         },
//         wrapperCol: {
//           span: 19
//         },
//         children: null
//       },
//       fieldOption: {
//         initialValue: user.projects ? user.projects.map((item) => item.id) : ''
//       },
//       component: {
//         option: {
//           multi: true
//         },
//         type: FormType.Select,
//         selectOptions: projectSelect
//       }
//     },
//     {
//       id: 'division',
//       label: '배분 여부',
//       colProps: {
//         span: 24
//       },
//       fieldOption: {
//         initialValue: user.division ? 1 : 0
//       },
//       formItemProps: {
//         labelCol: {
//           span: 5
//         },
//         wrapperCol: {
//           span: 19
//         },
//         children: null
//       },
//       component: {
//         type: FormType.Radio,
//         selectOptions: useBooleanOpt
//       }
//     }
//   ];
// }
