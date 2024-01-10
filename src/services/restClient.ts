import { Axios, AxiosResponse, HttpStatusCode } from 'axios'

export default class RestClient {
  private readonly client: Axios

  constructor(host: string) {
    this.client = new Axios({
      baseURL: host,
    })
  }

  public async get<T>(path: string): Promise<AxiosResponse<T>> {
    const response = await this.client.get<T>(path)

    return response
  }

  public static readonly RESPONSE_OK = HttpStatusCode.Ok
}
