import { UserRepoService } from '@app/shared/reposervice/user.repo.service';
import { User, AppPermission, UserProfile } from '@app/shell/models/user.model';
import { UserInfo } from '@app/shell/models/user.info.model';
import { map } from 'rxjs/operators';

export class UserPersonaFormService {
    constructor(private userRepoSrv: UserRepoService) {
    }
    save(permissions: AppPermission[], completeCallback: any) {
        this.userRepoSrv.saveAppPermissions(permissions).subscribe(el => {
            completeCallback(el);
        });
    }
    get(id: number, completeCallback: any) {
        const user: UserProfile = {} as UserProfile;
        return this.userRepoSrv.getUserInfoByUser(id).subscribe((el: UserInfo) => {
            user.firstName=el.firstname;
            user.lastName=el.lastname;
            user.id=el.id,
            user.displayname = el.displayname;
            //user.email=el.email;
            return this.userRepoSrv.getAppPermissionsById(id).subscribe((sel: AppPermission[]) => {
                user.permissions = sel;
                completeCallback(user);
            });
        });
    }
    generateNew(): User {
        return {} as User;
    }
}