import React, { PureComponent } from 'react';
import { Tabs } from 'antd';
import PageWrapper from '@components/PageWrapper';
import DiscountTab from '@views/Setting/Product/tabs/DiscountTab';
import CorpTicketClassTab from '@views/Setting/Product/tabs/CorpTicketClassTab';
import TicketClassTab from '@views/Setting/Product/tabs/TicketClassTab';
import { IDiscountClassObj } from '@models/discountClass';
import { createDiscountClasses, getDiscountClasses } from '@api/discountClass';
import {
  createCorpTicketClasses,
  getCorpTicketClasses,
  updateCorpTicketClasses
} from '@api/corpTicketClass';
import { createTicketClasses, getTicketClasses, updateTicketClasses } from '@api/ticketClass';
import {
  createBarcode,
  createBarcodeClasses,
  getBarcode,
  getBarcodeClasses,
  updateBarcode,
  updateBarcodeClasses
} from '@api/barcode';
import { runInAction } from 'mobx';
import { ITicketClassObj } from '@models/ticketClass';
import { ICorpTicketClassObj } from '@models/corpTicketClass';
import { ISelectOptions } from '@utils/form';
import { EDelYn } from '@/constants/list';
import { IBarcodeClassObj, IBarcodeObj } from '@models/barcode';
import BarcodeTab from '@views/Setting/Product/tabs/BarcodeTab';
import { conversionDateTime } from '@utils/conversion';
import moment from 'moment';

interface IProps {}
interface IState {
  loading: boolean;
  discountClasses: IDiscountClassObj[];
  ticketClasses: ITicketClassObj[];
  corpTicketClasses: ICorpTicketClassObj[];
  discountSelectClasses: ISelectOptions[];
  barcode: IBarcodeObj | null;
  barcodeClasses: IBarcodeClassObj[];
}

class ProductSetting extends PureComponent<IProps, IState> {
  constructor(props: any) {
    super(props);
    this.state = {
      loading: true,
      discountClasses: [],
      ticketClasses: [],
      corpTicketClasses: [],
      discountSelectClasses: [],
      barcode: null,
      barcodeClasses: []
    };
  }
  componentDidMount() {
    this.setState({ loading: true });

    getDiscountClasses()
      .then((res: any) => {
        const { msg, data } = res;
        if (msg === 'success') {
          runInAction(() => {
            this.setState({ discountClasses: data });
            const unique: ISelectOptions[] = [];
            this.state.discountClasses
              .filter((e) => {
                return e.delYn != EDelYn.Y;
              })
              .forEach((e) => {
                unique.push({ value: String(e.sn), label: e.discountName });
              });
            this.setState({ discountSelectClasses: unique });
          });
        }
      })
      .catch(() => {});

    getTicketClasses()
      .then((res: any) => {
        const { msg, data } = res;
        if (msg === 'success') {
          runInAction(() => {
            this.setState({ ticketClasses: data });
          });
        }
      })
      .catch(() => {});

    getCorpTicketClasses()
      .then((res: any) => {
        const { msg, data } = res;
        if (msg === 'success') {
          runInAction(() => {
            this.setState({ corpTicketClasses: data });
          });
        }
      })
      .catch(() => {});

    getBarcode()
      .then((res: any) => {
        const { msg, data } = res;
        if (msg === 'success') {
          runInAction(() => {
            this.setState({ barcode: data[0] });
          });
        }
      })
      .catch(() => {});

    getBarcodeClasses()
      .then((res: any) => {
        const { msg, data } = res;
        if (msg === 'success') {
          runInAction(() => {
            this.setState({ barcodeClasses: data });
          });
        }
      })
      .catch(() => {});

    this.setState({ loading: false });
  }

  initDiscountClasses = () => {
    getDiscountClasses()
      .then((res: any) => {
        const { msg, data } = res;
        if (msg === 'success') {
          runInAction(() => {
            this.setState({ discountClasses: data });
            const unique: ISelectOptions[] = [];
            this.state.discountClasses
              .filter((e) => {
                return e.delYn != EDelYn.Y;
              })
              .forEach((e) => {
                unique.push({ value: String(e.sn), label: e.discountName });
              });
            this.setState({ discountSelectClasses: unique }, () =>
              console.log(this.state.discountSelectClasses)
            );
          });
        }
      })
      .catch(() => {});
  };

  handleTicketClass = (info: ITicketClassObj) => {
    console.log('handleTicketClass', info);
    if (info.sn === null) {
      createTicketClasses(info)
        .then((res: any) => {
          const { msg, data } = res;
          if (msg === 'success') {
            runInAction(() => {
              const ticketClasses = [...this.state.ticketClasses, data];
              this.setState({ ticketClasses: ticketClasses });
            });
          }
        })
        .catch(() => {});
    } else {
      updateTicketClasses(info)
        .then((res: any) => {
          const { msg, data } = res;
          if (msg === 'success') {
            runInAction(() => {
              const ticketClasses = this.state.ticketClasses.map((t) => {
                if (t.sn === data.sn) {
                  return { ...data };
                }
                return { ...t };
              });
              this.setState({ ticketClasses: ticketClasses });
            });
          }
        })
        .catch(() => {});
    }
  };

  handleDiscount = (info: IDiscountClassObj) => {
    // console.log('handleDiscount', info);
    if (info.sn === null) {
      info.delYn = EDelYn.N;
      createDiscountClasses(info)
        .then((res: any) => {
          const { msg, data } = res;
          if (msg === 'success') {
            runInAction(() => {
              const discountClasses = [...this.state.discountClasses, data];
              this.setState({ discountClasses: discountClasses }, () => this.initDiscountClasses());
            });
          }
        })
        .catch(() => {});
    } else {
      createDiscountClasses(info)
        .then((res: any) => {
          const { msg, data } = res;
          if (msg === 'success') {
            runInAction(() => {
              const discountClasses = this.state.discountClasses.map((t) => {
                if (t.sn === data.sn) {
                  return { ...data };
                }
                return { ...t };
              });
              this.setState({ discountClasses: discountClasses }, () => this.initDiscountClasses());
            });
          }
        })
        .catch(() => {});
    }
  };

  handleCorpTicketClasses = (info: ICorpTicketClassObj) => {
    // console.log('handleCorpTicketClasses', info);
    if (info.sn === null) {
      createCorpTicketClasses(info)
        .then((res: any) => {
          const { msg, data } = res;
          if (msg === 'success') {
            runInAction(() => {
              const corpTicketClasses = [...this.state.corpTicketClasses, data];
              this.setState({ corpTicketClasses: corpTicketClasses });
            });
          }
        })
        .catch(() => {});
    } else {
      updateCorpTicketClasses(info)
        .then((res: any) => {
          const { msg, data } = res;
          if (msg === 'success') {
            runInAction(() => {
              const corpTicketClasses = this.state.corpTicketClasses.map((t) => {
                if (t.sn === data.sn) {
                  return { ...data };
                }
                return { ...t };
              });
              this.setState({ corpTicketClasses: corpTicketClasses });
            });
          }
        })
        .catch(() => {});
    }
  };

  handleBarcode = (info: IBarcodeObj) => {
    // console.log('handleBarcode', info);
    if (info.sn === null || info.sn === undefined) {
      createBarcode(info)
        .then((res: any) => {
          const { msg, data } = res;
          if (msg === 'success') {
            runInAction(() => {
              this.setState({ barcode: data });
            });
          }
        })
        .catch(() => {});
    } else {
      updateBarcode(info)
        .then((res: any) => {
          const { msg, data } = res;
          if (msg === 'success') {
            runInAction(() => {
              this.setState({ barcode: data });
            });
          }
        })
        .catch(() => {});
    }
  };

  handleBarcodeClass = (info: IBarcodeClassObj) => {
    console.log('handleBarcodeClass', info);
    if (info.sn === null || info.sn === undefined) {
      createBarcodeClasses(info)
        .then((res: any) => {
          const { msg, data } = res;
          if (msg === 'success') {
            runInAction(() => {
              const barcodeClasses = [...this.state.barcodeClasses, data];
              this.setState({ barcodeClasses: barcodeClasses });
            });
          }
        })
        .catch(() => {});
    } else {
      updateBarcodeClasses(info)
        .then((res: any) => {
          const { msg, data } = res;
          if (msg === 'success') {
            runInAction(() => {
              const barcodeClasses = this.state.barcodeClasses.map((t) => {
                if (t.sn === data.sn) {
                  return { ...data };
                }
                return { ...t };
              });
              this.setState({ barcodeClasses: barcodeClasses });
            });
          }
        })
        .catch(() => {});
    }
  };

  render() {
    const { TabPane } = Tabs;
    const { discountClasses, ticketClasses, corpTicketClasses } = this.state;
    return (
      <PageWrapper>
        <Tabs type="card">
          <TabPane tab="기간정기권" key="1">
            <TicketClassTab
              loading={this.state.loading}
              ticketClasses={ticketClasses}
              onSubmit={this.handleTicketClass}
            />
          </TabPane>
          {/*<TabPane tab="시간정기권" key="2">*/}
          {/*  <TimePassTab />*/}
          {/*</TabPane>*/}
          <TabPane tab="할인/감면" key="3">
            <DiscountTab
              discountClasses={discountClasses}
              loading={this.state.loading}
              onSubmit={this.handleDiscount}
            />
          </TabPane>
          <TabPane tab="입주사할인권" key="4">
            <CorpTicketClassTab
              discountSelectClasses={this.state.discountSelectClasses}
              corpTicketClasses={corpTicketClasses}
              discountClasses={discountClasses}
              loading={this.state.loading}
              onSubmit={this.handleCorpTicketClasses}
            />
          </TabPane>
          <TabPane tab="바코드할인권" key="5">
            <BarcodeTab
              discountClasses={discountClasses}
              discountSelectClasses={this.state.discountSelectClasses}
              barcode={this.state.barcode ? this.state.barcode : null}
              barcodeClasses={this.state.barcodeClasses}
              loading={this.state.loading}
              onSubmit={this.handleBarcode}
              onClassSubmit={this.handleBarcodeClass}
            />
          </TabPane>
        </Tabs>
      </PageWrapper>
    );
  }
}

export default ProductSetting;
