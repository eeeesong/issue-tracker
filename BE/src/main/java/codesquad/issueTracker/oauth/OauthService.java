package codesquad.issueTracker.oauth;

import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.exceptions.JWTCreationException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.RequestEntity;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.Optional;

@Service
public class OauthService {
    private final Logger logger = LoggerFactory.getLogger(OauthService.class);

    public OauthDTO githubToken(String code) {

        logger.info("code : {}", code);
        RestTemplate gitHubRequest = new RestTemplate();

        GithubAccessTokenResponse accessToken = getAccessToken(code, gitHubRequest)
                .orElseThrow(() -> new RuntimeException("바디 없음"));


        OauthUser oauthUser = getUserFromGitHub(accessToken, gitHubRequest)
                .orElseThrow(() -> new RuntimeException("바디 없음"));

        String jwtToken = getJwt(oauthUser);
        logger.info("accessToken : {}", accessToken);
        logger.info("gitHubRequest : {}", gitHubRequest);
        logger.info("jwtToken : {}", jwtToken);
        logger.info("user : {} ", oauthUser);
        return new OauthDTO(jwtToken, oauthUser.getAvatarUrl(), oauthUser.getLoginId());
    }

    private String getJwt(OauthUser oauthUser) {

        try {
            Algorithm algorithm = Algorithm.HMAC256("secret");
            String ISSUER = "";
            return JWT.create()
                    .withClaim("login", oauthUser.getLoginId())
                    .withClaim("name", oauthUser.getName())
                    .withIssuer(ISSUER)
                    .sign(algorithm);
        } catch (JWTCreationException exception) {
            //Invalid Signing configuration /or/ Couldn't convert Claims.
            throw new RuntimeException(exception);
        }
    }

    private Optional<OauthUser> getUserFromGitHub(GithubAccessTokenResponse accessToken, RestTemplate gitHubRequest) {

        String GITHUB_USER_URI = "https://api.github.com/user";

        RequestEntity<Void> request = RequestEntity
                .get(GITHUB_USER_URI)
                .header("Accept", "application/json")
                .header("Authorization", "token " + accessToken.getAccessToken())
                .build();

        ResponseEntity<OauthUser> response = gitHubRequest
                .exchange(request, OauthUser.class);

        return Optional.ofNullable(response.getBody());
    }

    private Optional<GithubAccessTokenResponse> getAccessToken(String code, RestTemplate gitHubRequest) {

        String GITHUB_ACCESS_TOKEN_URI = "https://github.com/login/oauth/access_token";
        String CLIENT_ID = "b09a851597aba83d2b5e";
        String CLIENT_SECRET = "password";

        RequestEntity<GithubAccessTokenRequest> request = RequestEntity
                .post(GITHUB_ACCESS_TOKEN_URI)
                .header("Accept", "application/json")
                .body(new GithubAccessTokenRequest(CLIENT_ID, CLIENT_SECRET, code));

        ResponseEntity<GithubAccessTokenResponse> response = gitHubRequest
                .exchange(request, GithubAccessTokenResponse.class);

        return Optional.ofNullable(response.getBody());
    }
}
