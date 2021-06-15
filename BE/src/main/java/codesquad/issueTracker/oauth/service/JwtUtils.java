package codesquad.issueTracker.oauth.service;

import codesquad.issueTracker.domain.User;
import codesquad.issueTracker.oauth.dto.OauthJwt;
import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.exceptions.JWTCreationException;
import com.auth0.jwt.interfaces.DecodedJWT;
import com.auth0.jwt.interfaces.JWTVerifier;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.PropertySource;
import org.springframework.stereotype.Component;

import java.sql.Date;
import java.time.LocalDate;

@Component
@PropertySource("classpath:oauth.properties")
public class JwtUtils {

    private static final String ISSUER = "issue";
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

    public OauthJwt getJwt(User user) {
        try {
            String token = JWT.create()
                    .withClaim(LOGIN_ID, user.getLoginId())
                    .withClaim(IMAGE_URL, user.getImageUrl())
                    .withClaim(NAME, user.getName())
                    .withIssuer(ISSUER)
                    .withExpiresAt(Date.valueOf(LocalDate.now().plusDays(2)))
                    .sign(ALGORITHM);
            return new OauthJwt(token);
        } catch (JWTCreationException exception) {
            throw new RuntimeException(exception);
        }
    }

    public User getUserFromJwt(DecodedJWT jwt) {
        return User.of(
                jwt.getClaim(LOGIN_ID).asString(),
                jwt.getClaim(IMAGE_URL).asString(),
                jwt.getClaim(NAME).asString()
        );
    }

    public DecodedJWT verify(String token) {
        return jwtVerifier.verify(token);
    }
}
