package codesquad.issueTracker.oauth.interceptor;

import codesquad.issueTracker.domain.User;
import codesquad.issueTracker.oauth.exception.BadRequest;
import codesquad.issueTracker.oauth.exception.NoAuthorizationException;
import codesquad.issueTracker.oauth.service.JwtUtils;
import com.auth0.jwt.interfaces.DecodedJWT;
import org.springframework.stereotype.Component;
import org.springframework.web.servlet.HandlerInterceptor;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

@Component
public class OauthInterceptor implements HandlerInterceptor {
    private final JwtUtils jwtUtils;

    public OauthInterceptor(JwtUtils jwtUtils) {
        this.jwtUtils = jwtUtils;
    }

    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) {
        if ("OPTIONS".equalsIgnoreCase(request.getMethod())) {
            return true;
        }

        String token = getJwt(request);
        DecodedJWT jwt = jwtUtils.verify(token);
        User user = jwtUtils.getUserFromJwt(jwt);
        request.setAttribute("user", user);
        return true;
    }

    private String getJwt(HttpServletRequest request) {
        String authorizationHeader = request.getHeader("Authorization");
        if (authorizationHeader == null) {
            throw new NoAuthorizationException("토큰 없음");
        }

        if (!authorizationHeader.startsWith("Bearer")) {
            throw new BadRequest("토큰 타입 이상");
        }
        return authorizationHeader.substring("Bearer".length()).trim();
    }
}
