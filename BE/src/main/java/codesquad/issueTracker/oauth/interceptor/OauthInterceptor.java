package codesquad.issueTracker.oauth.interceptor;

import codesquad.issueTracker.oauth.annotation.LoginRequired;
import codesquad.issueTracker.oauth.service.JwtUtils;
import com.auth0.jwt.interfaces.DecodedJWT;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;
import org.springframework.web.method.HandlerMethod;
import org.springframework.web.servlet.HandlerInterceptor;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

@Component
@RequiredArgsConstructor
public class OauthInterceptor implements HandlerInterceptor {
    private static final String AUTHORIZATION = "Authorization";
    private static final String BEARER = "Bearer";
    private final JwtUtils jwtUtils;

    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) {
        if (loginRequired(handler)) {
            verifyJwt(request);
        }
        return true;
    }

    private boolean loginRequired(Object handler) {
        return handler instanceof HandlerMethod
                && ((HandlerMethod) handler).hasMethodAnnotation(LoginRequired.class);
    }

    private void verifyJwt(HttpServletRequest request) {
        String header = request.getHeader(AUTHORIZATION);
        verifyHeader(header);

        String jwt = header.substring(BEARER.length()).trim();
        DecodedJWT decodedJWT = jwtUtils.verify(jwt);

        System.out.println(jwtUtils.getUserIdFromJwt(decodedJWT));
        request.setAttribute("userId", jwtUtils.getUserIdFromJwt(decodedJWT));
    }

    private void verifyHeader(String header) {
        if (header == null || !header.startsWith(BEARER)) {
            throw new RuntimeException("헤더 없음");
        }
    }
}
