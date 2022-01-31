import { Request, Response } from 'express'
import shortId from 'shortid'
import {config} from '../config/Constants'
import { URLModel } from '../database/models/URL'

export class URLController {
  public async shorten(request: Request, response: Response): Promise<void> {
    const {originURL} = request.body

    const url = await URLModel.findOne({ originURL })
		if (url) {
			response.json(url)
			return
		}

    const hash = shortId.generate()
    const shortURL = `${config.API_URL}/${hash}`
		const newURL = await URLModel.create({ hash, shortURL, originURL })

    response.send(newURL)

  }
  public async redirect(request: Request, response: Response): Promise<void> {
    const { hash } = request.params

    const url = {
      originURL: "testedeurlparashorten",
      hash: "g_KCtqXtv",
      shortURL: "http://localhost:5000/g_KCtqXtv"
    }
    response.redirect(url.originURL);
  }
}