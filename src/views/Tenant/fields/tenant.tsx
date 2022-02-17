import { IFormFieldConfig } from '@utils/form';
import { ICorpObj, ICorpSearchReq } from '@models/corp';
import { localeStore } from '@store/localeStore';
import {
  corpSearchOpt,
  delYnOpt,
  ECorpSearchCondition,
  EDelYn,
  useOrUnuseOpt
} from '@/constants/list';
import { FormType } from '@/constants/form';

export function searchCorpFields(): IFormFieldConfig<keyof ICorpSearchReq>[] {
  const { localeObj } = localeStore;
  return [
    {
      id: 'useStatus',
      label: '조회 기준',
      fieldOption: {
        initialValue: EDelYn.ALL
      },
      formItemProps: {
        labelCol: {
          xl: 9,
          xs: 9
        },
        wrapperCol: {
          xl: 15,
          xs: 15
        },
        children: null
      },
      component: {
        type: FormType.Select,
        selectOptions: delYnOpt
      }
    },
    {
      id: 'searchLabel',
      label: '검색',
      fieldOption: {
        initialValue: ECorpSearchCondition.ID
      },
      formItemProps: {
        labelCol: {
          xl: 9,
          xs: 9
        },
        wrapperCol: {
          xl: 15,
          xs: 15
        },
        children: null
      },
      component: {
        type: FormType.Select,
        selectOptions: corpSearchOpt,
        option: {
          col: 0
        }
      },
      formSubItemProps: {
        id: 'searchText',
        component: {
          type: FormType.Input,
          option: {
            placeholder: '전화번호 검색시 끝 4자리'
          }
        }
      }
    }
  ];
}

export function CorpRegisterFields(): IFormFieldConfig<keyof ICorpObj>[] {
  return [
    {
      id: 'corpName',
      label: '입주사명',
      colProps: {
        xl: 12,
        xs: 24
      },
      formItemProps: {
        labelCol: {
          xl: 9,
          xs: 9
        },
        wrapperCol: {
          xl: 15,
          xs: 15
        },
        children: null
      },
      fieldOption: {
        rules: [{ required: true, message: '필수 입력값 입니다' }]
      },
      component: {
        type: FormType.Input,
        option: {
          placeholder: '입주사명'
        }
      }
    },
    {
      id: 'password',
      label: '패스워드',
      colProps: {
        xl: 12,
        xs: 24
      },
      formItemProps: {
        labelCol: {
          xl: 9,
          xs: 9
        },
        wrapperCol: {
          xl: 15,
          xs: 15
        },
        children: null
      },
      component: {
        type: FormType.Input,
        option: {
          placeholder: '패스워드'
        }
      }
    },
    {
      id: 'userName',
      label: '대표자명',
      colProps: {
        xl: 12,
        xs: 24
      },
      formItemProps: {
        labelCol: {
          xl: 9,
          xs: 9
        },
        wrapperCol: {
          xl: 15,
          xs: 15
        },
        children: null
      },
      fieldOption: {
        rules: [{ required: true, message: '필수 입력값 입니다' }]
      },
      component: {
        type: FormType.Input,
        option: {
          placeholder: '대표자명'
        }
      }
    },
    {
      id: 'userPhone',
      label: '전화번호',
      colProps: {
        xl: 12,
        xs: 24
      },
      formItemProps: {
        labelCol: {
          xl: 9,
          xs: 9
        },
        wrapperCol: {
          xl: 15,
          xs: 15
        },
        children: null
      },
      fieldOption: {
        rules: [{ required: true, message: '필수 입력값 입니다' }]
      },
      component: {
        type: FormType.Input,
        option: {
          placeholder: '- 포함 입력'
        }
      }
    },
    {
      id: 'dong',
      label: '동',
      colProps: {
        xl: 12,
        xs: 24
      },
      formItemProps: {
        labelCol: {
          xl: 9,
          xs: 9
        },
        wrapperCol: {
          xl: 15,
          xs: 15
        },
        children: null
      },
      component: {
        type: FormType.Input,
        option: {
          placeholder: '동'
        }
      }
    },
    {
      id: 'ho',
      label: '호수',
      colProps: {
        xl: 12,
        xs: 24
      },
      formItemProps: {
        labelCol: {
          xl: 9,
          xs: 9
        },
        wrapperCol: {
          xl: 15,
          xs: 15
        },
        children: null
      },
      component: {
        type: FormType.Input,
        option: {
          placeholder: '호수'
        }
      }
    },
    {
      id: 'userRole',
      fieldOption: {
        initialValue: 'STORE'
      },
      component: {
        type: FormType.Input
      }
    }
  ];
}

export function CorpUpdateFields(corp: ICorpObj): IFormFieldConfig<keyof ICorpObj>[] {
  return [
    {
      id: 'corpName',
      label: '입주사명',
      colProps: {
        xl: 12,
        xs: 24
      },
      formItemProps: {
        labelCol: {
          xl: 9,
          xs: 9
        },
        wrapperCol: {
          xl: 15,
          xs: 15
        },
        children: null
      },
      fieldOption: {
        initialValue: corp.corpName ? corp.corpName : null,
        rules: [{ required: true, message: '필수 입력값 입니다' }]
      },
      component: {
        type: FormType.Input,
        option: {
          placeholder: '입주사명'
        }
      }
    },
    {
      id: 'password',
      label: '패스워드',
      colProps: {
        xl: 12,
        xs: 24
      },
      formItemProps: {
        labelCol: {
          xl: 9,
          xs: 9
        },
        wrapperCol: {
          xl: 15,
          xs: 15
        },
        children: null
      },
      component: {
        type: FormType.Input,
        option: {
          placeholder: '패스워드 변경'
        }
      }
    },
    {
      id: 'ceoName',
      label: '대표자명',
      colProps: {
        xl: 12,
        xs: 24
      },
      formItemProps: {
        labelCol: {
          xl: 9,
          xs: 9
        },
        wrapperCol: {
          xl: 15,
          xs: 15
        },
        children: null
      },
      fieldOption: {
        initialValue: corp.ceoName ? corp.ceoName : null,
        rules: [{ required: true, message: '필수 입력값 입니다' }]
      },
      component: {
        type: FormType.Input,
        option: {
          placeholder: '대표자명'
        }
      }
    },
    {
      id: 'tel',
      label: '전화번호',
      colProps: {
        xl: 12,
        xs: 24
      },
      formItemProps: {
        labelCol: {
          xl: 9,
          xs: 9
        },
        wrapperCol: {
          xl: 15,
          xs: 15
        },
        children: null
      },
      fieldOption: {
        initialValue: corp ? corp.tel : null,
        rules: [{ required: true, message: '필수 입력값 입니다' }]
      },
      component: {
        type: FormType.Input,
        option: {
          placeholder: '- 포함 입력'
        }
      }
    },
    {
      id: 'dong',
      label: '동',
      colProps: {
        xl: 12,
        xs: 24
      },
      formItemProps: {
        labelCol: {
          xl: 9,
          xs: 9
        },
        wrapperCol: {
          xl: 15,
          xs: 15
        },
        children: null
      },
      fieldOption: {
        initialValue: corp.dong ? corp.dong : null
      },
      component: {
        type: FormType.Input,
        option: {
          placeholder: '동'
        }
      }
    },
    {
      id: 'ho',
      label: '호수',
      colProps: {
        xl: 12,
        xs: 24
      },
      formItemProps: {
        labelCol: {
          xl: 9,
          xs: 9
        },
        wrapperCol: {
          xl: 15,
          xs: 15
        },
        children: null
      },
      fieldOption: {
        initialValue: corp.ho ? corp.ho : null
      },
      component: {
        type: FormType.Input,
        option: {
          placeholder: '호수'
        }
      }
    },
    {
      id: 'delYn',
      label: '활성',
      colProps: {
        xl: 12,
        xs: 24
      },
      formItemProps: {
        labelCol: {
          xl: 9,
          xs: 9
        },
        wrapperCol: {
          xl: 15,
          xs: 15
        },
        children: null
      },
      fieldOption: {
        initialValue: corp.delYn ? corp.delYn : null
      },
      component: {
        type: FormType.Select,
        selectOptions: delYnOpt.filter((item) => item.value !== EDelYn.ALL)
      }
    },
    {
      id: 'corpId',
      label: '입주사ID',
      colProps: {
        xl: 12,
        xs: 24
      },
      fieldOption: {
        initialValue: corp.corpId ? corp.corpId : null
      },
      formItemProps: {
        labelCol: {
          xl: 9,
          xs: 9
        },
        wrapperCol: {
          xl: 15,
          xs: 15
        },
        children: null
      },
      component: {
        type: FormType.Input,
        option: {
          readOnly: true
        }
      }
    },
    {
      id: 'sn',
      fieldOption: {
        initialValue: corp.sn ? corp.sn : null
      },
      component: {
        type: FormType.Input
      }
    },
    {
      id: 'userRole',
      fieldOption: {
        initialValue: 'STORE'
      },
      component: {
        type: FormType.Input
      }
    }
  ];
}
