import { IFormFieldConfig } from '@utils/form';
import { FormType } from '@/constants/form';
import { IUserObj } from '@models/user';
import { localeStore } from '@store/localeStore';
import { ESearchUserType, roleOpt, userSearchOpt } from '@/constants/list';

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

export function searchAdminFields(): IFormFieldConfig<keyof IUserObj>[] {
  const { localeObj } = localeStore;
  return [
    {
      id: 'searchLabel',
      label: '조회기준',
      fieldOption: {
        initialValue: ESearchUserType.USERNAME
      },
      component: {
        type: FormType.Select,
        option: {
          placeholder: localeObj['label.choose'] || '선택해주세요',
          allowClear: true
        },
        selectOptions: userSearchOpt
      },
      formSubItemProps: {
        id: 'searchText',
        component: {
          type: FormType.Input
        },
        formItemProps: {
          wrapperCol: {
            xl: 10,
            xs: 16
          }
        }
      },
      colProps: {
        xl: 16,
        xs: 24
      },
      formItemProps: {
        labelCol: {
          xl: 4,
          xs: 8
        },
        wrapperCol: {
          xl: 10,
          xs: 16
        }
      }
    }
  ];
}

export function newUserFields(user?: IUserObj): IFormFieldConfig<keyof IUserObj>[] {
  const { localeObj } = localeStore;
  return [
    {
      id: 'userName',
      label: '사용자이름',
      fieldOption: {
        initialValue: user ? user.userName : null,
        rules: [{ required: true, whitespace: true, message: '필수 입력 값입니다' }]
      },
      colProps: {
        xl: 12,
        xs: 24
      },
      formItemProps: {
        labelCol: {
          xl: 8,
          xs: 8
        },
        wrapperCol: {
          xl: 16,
          xs: 16
        }
      },
      component: {
        type: FormType.Input
      }
    },
    {
      id: 'id',
      label: '사용자ID',
      fieldOption: {
        initialValue: user ? user.id : null,
        rules: [{ required: true, whitespace: true, message: '필수 입력 값입니다' }]
      },
      colProps: {
        xl: 12,
        xs: 24
      },
      formItemProps: {
        labelCol: {
          xl: 8,
          xs: 8
        },
        wrapperCol: {
          xl: 16,
          xs: 16
        }
      },
      component: {
        type: FormType.Input
      }
    },
    {
      id: 'userPhone',
      label: '전화번호',
      fieldOption: {
        initialValue: user ? user.userPhone : null,
        rules: [{ required: true, whitespace: true, message: '필수 입력 값입니다' }]
      },
      colProps: {
        xl: 12,
        xs: 24
      },
      formItemProps: {
        labelCol: {
          xl: 8,
          xs: 8
        },
        wrapperCol: {
          xl: 16,
          xs: 16
        }
      },
      component: {
        type: FormType.Input
      }
    },
    {
      id: 'role',
      label: '권한',
      fieldOption: {
        initialValue: user ? user.role : null,
        rules: [{ required: true, whitespace: true, message: '필수 입력 값입니다' }]
      },
      colProps: {
        xl: 12,
        xs: 24
      },
      formItemProps: {
        labelCol: {
          xl: 8,
          xs: 8
        },
        wrapperCol: {
          xl: 16,
          xs: 16
        }
      },
      component: {
        type: FormType.Select,
        option: {
          placeholder: localeObj['label.choose'] || '선택해주세요',
          allowClear: true
        },
        selectOptions: roleOpt
      }
    },
    {
      id: 'password',
      label: '비밀번호',
      colProps: {
        xl: 12,
        xs: 24
      },
      fieldOption: {
        rules: user
          ? undefined
          : [{ required: true, whitespace: true, message: '필수 입력 값입니다' }]
      },
      formItemProps: {
        labelCol: {
          xl: 8,
          xs: 8
        },
        wrapperCol: {
          xl: 16,
          xs: 16
        }
      },
      component: {
        type: FormType.Input
      }
    },
    {
      id: 'passwordCnfirm',
      label: '비밀번호 확인',
      hidden: user ? true : false,
      colProps: {
        xl: 12,
        xs: 24
      },
      formItemProps: {
        labelCol: {
          xl: 8,
          xs: 8
        },
        wrapperCol: {
          xl: 16,
          xs: 16
        }
      },
      component: {
        type: FormType.Input
      },
      fieldOption: {
        rules: user
          ? undefined
          : [{ required: true, whitespace: true, message: '필수 입력 값입니다' }]
      }
    },
    {
      id: 'idx',
      fieldOption: {
        initialValue: user ? user.idx : null
      },
      colProps: {
        xl: 12,
        xs: 24
      },
      formItemProps: {
        labelCol: {
          xl: 8,
          xs: 8
        },
        wrapperCol: {
          xl: 16,
          xs: 16
        }
      },
      component: {
        type: FormType.Input
      }
    }
  ];
}
