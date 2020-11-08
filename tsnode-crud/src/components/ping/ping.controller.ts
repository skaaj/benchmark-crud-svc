import { GET, Path } from 'typescript-rest';

@Path('/ping')
export class PingController {
    @GET
    public get(): string {
        return "";
    }
}