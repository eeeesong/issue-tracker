package codesquad.issueTracker.oauth;

import codesquad.issueTracker.oauth.dto.OauthDTO;
import codesquad.issueTracker.oauth.service.OauthService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/login")
public class OauthController {

    private OauthService oauthService;

    public OauthController(OauthService oauthService) {
        this.oauthService = oauthService;
    }


    @GetMapping("/web")
    public OauthDTO oauthGitHubTokenByWeb(@RequestParam String code) {
        return oauthService.githubTokenWeb(code);
    }

    @GetMapping("/ios")
    public OauthDTO oauthGitHubTokenByIos(@RequestParam String code) {
        return oauthService.githubTokenIos(code);
    }
}
