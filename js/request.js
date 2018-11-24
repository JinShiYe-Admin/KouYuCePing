import { consts } from '../mock-data/consts'

export let request = {
  /**
   * 发送数据
   * @param url  接口地址
   * @param data 发送的数据
   * @param callback 回调
   */
  postData: function (url, data, callback) {
    let request = new XMLHttpRequest()
    request.responseType = 'json'
    request.onreadystatechange = function () {
      console.log('此时的状态：' + request.readyState)
      console.log('此时的数据：' + JSON.stringify(request.response))
      if (request.readyState === 4) {
        if (request.response === null) {
          return
        }
        callback(request.response)
      }
    }
    request.open('POST', url, true)
    request.send(data)
  },
  //获取部门列表
  getDepartList: function (callback) {
    this.postData(consts.MAINURL, JSON.stringify({
      cmd: 'persondeparts',
      type: 'findpage'
    }), function (response) {
      console.log('获取的部门列表值：' + JSON.stringify(response))
      if (response.RspCode === '0000') {
        callback(JSON.parse(response.RspData));
      } else {
        if (response.RspCode !== '0013') {
          alert(response.RspTxt)
        }
      }
    })
  },
  /**
   *
   * @param id  部门id
   * @param colv 0 1  是否递归
   * @param callcol 0 1 是否获取详情
   * @param callback
   */
  getDepartPersons: function (id, colv, callcol, callback) {
    if (callcol) {
      callcol = 'info'
    } else {
      callcol = 'base'
    }
    if (typeof(id.value) !== 'undefined') {
      id = id.value
    }
    this.postData(consts.MAINURL, JSON.stringify({
      cmd: 'departpersons',
      type: 'findpage',
      colid: id,
      colv: colv,
      callcol: callcol
    }), function (response) {
      console.log('获取的部门人员列表列表值：' + JSON.stringify(response))
      if (response.RspCode === '0000') {
        callback(response.RspData)
      } else {
        callback([])
      }
    })
  },
  /**
   *
   * @param isGroup 是否群发
   * @param infoMap 发送的人员或部门map数据
   * @param dataInfo 其他数据
   * @param callback 回调
   */
  postMessage: function (isGroup, infoMap, dataInfo, callback) {
    let comData = {
      cmd: 'msg',
      isgroup: isGroup ? 1 : 0,
      touser: '',
      toparty: '',
      totag: '',
      safe: 0,
      tousername: '',
      topartyname: '',
      totagname: ''
    }
    if (isGroup) {
      comData.toparty = Array.from(infoMap.keys()).join('|')
      comData.topartyname = Array.from(infoMap.values()).join('|')
    } else {
      comData.touser = Array.from(infoMap.keys()).join('|')
      comData.tousername = Array.from(infoMap.values()).join('|')
    }
    Object.assign(comData, dataInfo)
    console.log('发布信息传递的值：' + JSON.stringify(comData))
    this.postData(consts.MAINURL, JSON.stringify(comData), function (response) {
      console.log('发布消息返回的值：' + JSON.stringify(response))
      callback(response)
    })

  }
}
