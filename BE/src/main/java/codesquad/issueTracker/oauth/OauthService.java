package codesquad.issueTracker.oauth;

import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.exceptions.JWTCreationException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.PropertySource;
import org.springframework.http.RequestEntity;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.Optional;

@Service
@PropertySource("classpath:oauth.properties")
public class OauthService {
    private final Logger logger = LoggerFactory.getLogger(OauthService.class);

    String GITHUB_ACCESS_TOKEN_URI;
    String CLIENT_ID_iOS;
    String CLIENT_SECRET_iOS;
    String CLIENT_ID_WEB;
    String CLIENT_SECRET_WEB;
    String GITHUB_USER_URI;
    String ISSUER;

    public OauthService(@Value("${GITHUB_ACCESS_TOKEN_URI}")String GITHUB_ACCESS_TOKEN_URI,
                        @Value("${CLIENT_ID_iOS}")String CLIENT_ID_iOS,
                        @Value("${CLIENT_SECRET_iOS}")String CLIENT_SECRET_iOS,
                        @Value("${CLIENT_ID_WEB}")String CLIENT_ID_WEB,
                        @Value("${CLIENT_SECRET_WEB}")String CLIENT_SECRET_WEB,
                        @Value("${GITHUB_USER_URI}")String GITHUB_USER_URI,
                        @Value("${ISSUER}")String ISSUER) {
        this.GITHUB_ACCESS_TOKEN_URI = GITHUB_ACCESS_TOKEN_URI;
        this.CLIENT_ID_iOS = CLIENT_ID_iOS;
        this.CLIENT_SECRET_iOS = CLIENT_SECRET_iOS;
        this.CLIENT_ID_WEB = CLIENT_ID_WEB;
        this.CLIENT_SECRET_WEB = CLIENT_SECRET_WEB;
        this.GITHUB_USER_URI = GITHUB_USER_URI;
        this.ISSUER = ISSUER;
    }

    public OauthDTO githubTokenWeb(String code) {
        return getToken(code, CLIENT_ID_WEB, CLIENT_SECRET_WEB);
    }

    public OauthDTO githubTokenIos(String code) {
        return getToken(code, CLIENT_ID_iOS, CLIENT_SECRET_iOS);
    }

    private OauthDTO getToken(String code, String clientId, String clientSecret) {
        logger.info("code : {}", code);
        RestTemplate gitHubRequest = new RestTemplate();
        GithubAccessTokenResponse accessToken = getAccessToken(code, clientId, clientSecret, gitHubRequest)
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

        RequestEntity<Void> request = RequestEntity
                .get(GITHUB_USER_URI)
                .header("Accept", "application/json")
                .header("Authorization", "token " + accessToken.getAccessToken())
                .build();

        ResponseEntity<OauthUser> response = gitHubRequest
                .exchange(request, OauthUser.class);

        return Optional.ofNullable(response.getBody());
    }

    private Optional<GithubAccessTokenResponse> getAccessToken(String code, String clientId, String clientSecret, RestTemplate gitHubRequest) {
        RequestEntity<GithubAccessTokenRequest> request = RequestEntity
                .post(GITHUB_ACCESS_TOKEN_URI)
                .header("Accept", "application/json")
                .body(new GithubAccessTokenRequest(clientId, clientSecret, code));

        ResponseEntity<GithubAccessTokenResponse> response = gitHubRequest
                .exchange(request, GithubAccessTokenResponse.class);

        return Optional.ofNullable(response.getBody());
    }
}
