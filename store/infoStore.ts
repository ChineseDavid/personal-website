import { observable, action } from 'mobx';
import { deepCopy } from '@/common/common';

interface BasicInfoItem {
  key: string;
  text: string;
  icon: string;
}

const InitBasicInfoItems = [
  { key: 'name', text: '姓名', icon: 'icon-name' },
  { key: 'sex', text: '性别', icon: 'icon-sex' },
  { key: 'experience', text: '工作经验', icon: 'icon-experience' },
  { key: 'edu', text: '学历', icon: 'icon-edu' },
  { key: 'status', text: '状态', icon: 'icon-status' },
  { key: 'phone', text: '电话', icon: 'icon-phone' },
  { key: 'wechat', text: '微信', icon: 'icon-wechat' },
  { key: 'email', text: '邮箱', icon: 'icon-email' },
]
interface BasicInfo {
  [key: string]: string;
}

class InfoStore {
  basicInfoItems: BasicInfoItem[] = deepCopy(InitBasicInfoItems);
  @observable basicInfo: BasicInfo = {};

  @action updateBasicInfo(key: string, value: string) {
    this.basicInfo[key] = value;
  }
}

const infoStore = new InfoStore();

export default infoStore;