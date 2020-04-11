import { getOssStsToken } from '@/api/oss'
import OSS from 'ali-oss'

export default function ossClient() {
  if (typeof ossClient.instance === 'object') {
    return ossClient.instance
  }

  this.uploadFile = async function(fileName, file, callback) {
    let valid = false
    if (this.client) {
      if (new Date(this.expiration) > new Date()) {
        valid = true
      }
    }
    if (!valid) {
      const result = await getOssStsToken()
      this.expiration = result.data.expiration
      this.client = new OSS({
        region: result.data.region,
        accessKeyId: result.data.accessKeyId,
        accessKeySecret: result.data.accessKeySecret,
        stsToken: result.data.securityToken,
        bucket: result.data.bucket
      })
    }
    return this.client.multipartUpload(fileName, file, callback)
  }
  ossClient.instance = this
  return this
}
