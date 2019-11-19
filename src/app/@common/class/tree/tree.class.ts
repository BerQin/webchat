export interface TreeItemInterface {
  title: string;
  key: string | number;
  children: TreeItemInterface[];
  disabled?: boolean;
  isLeaf?: boolean;
}

export class AppTree {

  creatTreeData(data: {[key: string]: any}[], type: {
    title: string | string[],
    key: string,
    disabled?: string,
    isLeaf?: string,
    extendsKey?: string[]
  }): TreeItemInterface[] {
    const returnData: TreeItemInterface[] = data.map((item): any => {
      let itemData: TreeItemInterface = {
        title: this.getTitle(item, type.title),
        key: item[type.key],
        children: this.creatTreeData(item.children, type),
        disabled: item[type.disabled] || item.disabled || false,
        isLeaf: item[type.isLeaf] || item.isLeaf || false,
      };
      const extendsKey = this.getExtendsKey(item, type.extendsKey || []);
      itemData = {
        ...itemData,
        ...extendsKey
      };
      return itemData;
    });
    return returnData;
  }

  getExtendsKey(data: {[key: string]: any}, keyList: string[]): {[key: string]: any} {
    const returnData: {[key: string]: any} = {};
    keyList.forEach((item) => {
      returnData[item] = data[item];
    });

    return returnData;
  }

  getTitle(data: {[key: string]: any}, keyList: string[] | string): string {
    let returnData: string = '';
    if (typeof keyList === 'string') {
      returnData = data[keyList];
    } else {
      keyList.forEach((item) => {
        returnData += data[item];
      });
    }

    return returnData;
  }

}

export const AppTreeFn = new AppTree();
