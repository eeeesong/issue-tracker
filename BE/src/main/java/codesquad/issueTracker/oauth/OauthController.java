package codesquad.issueTracker.oauth;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/oauth")
public class OauthController {

    private OauthService oauthService;

    public OauthController(OauthService oauthService) {
        this.oauthService = oauthService;
    }


    @GetMapping("/github/web")
    public OauthDTO oauthGitHubTokenByWeb(@RequestParam String code) {
        return oauthService.githubToken(code);
    }
}
