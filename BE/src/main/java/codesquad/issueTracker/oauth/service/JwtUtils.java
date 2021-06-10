package codesquad.issueTracker.oauth.service;

import codesquad.issueTracker.oauth.dto.OauthJwt;
import codesquad.issueTracker.oauth.dto.OauthUser;
import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.exceptions.JWTCreationException;
import com.auth0.jwt.interfaces.DecodedJWT;
import com.auth0.jwt.interfaces.JWTVerifier;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.PropertySource;
import org.springframework.stereotype.Component;

@Component
@PropertySource("classpath:oauth.properties")
public class JwtUtils {

    private static final String ISSUER = "issue";
    private static final String ID = "id";
    private static final String LOGIN_ID = "login_id";
    private static final String IMAGE_URL = "image_url";
    private static final String NAME = "name";

    private final Algorithm ALGORITHM;
    private final JWTVerifier jwtVerifier;

    public JwtUtils(@Value("${jwt.secret}") String SECRET) {
        ALGORITHM = Algorithm.HMAC256(SECRET);
        jwtVerifier = JWT.require(ALGORITHM)
                .acceptExpiresAt(0)
                .withIssuer(ISSUER)
                .build();
    }

    public JWTVerifier getJwtVerifier() {
        return jwtVerifier;
    }


    public OauthJwt getJwt(OauthUser oauthUser) {
        try {
            String token = JWT.create()
                    .withClaim(ID, oauthUser.getId())
                    .withClaim(LOGIN_ID, oauthUser.getLoginId())
                    .withClaim(IMAGE_URL, oauthUser.getAvatarUrl())
                    .withClaim(NAME, oauthUser.getName())
                    .withIssuer(ISSUER)
                    .sign(ALGORITHM);
            return new OauthJwt(token);
        } catch (JWTCreationException exception) {
            throw new RuntimeException(exception);
        }
    }


    public OauthUser getUserFromJwt(DecodedJWT jwt) {
        return OauthUser.of(
                jwt.getClaim(ID).asLong(),
                jwt.getClaim(LOGIN_ID).asString(),
                jwt.getClaim(IMAGE_URL).asString(),
                jwt.getClaim(NAME).asString()
        );
    }

    public DecodedJWT verify(String token) {
        return jwtVerifier.verify(token);
    }
}
