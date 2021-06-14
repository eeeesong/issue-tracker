package codesquad.issueTracker.config;

import codesquad.issueTracker.oauth.interceptor.OauthInterceptor;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.InterceptorRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebConfig implements WebMvcConfigurer {
    private final OauthInterceptor oauthInterceptor;

    public WebConfig(OauthInterceptor oauthInterceptor) {
        this.oauthInterceptor = oauthInterceptor;
    }

    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/**")
                .allowedOrigins("*")
                .allowedMethods("GET", "POST", "PUT");
    }

    @Override
    public void addInterceptors(InterceptorRegistry registry) {
        registry.addInterceptor(oauthInterceptor).addPathPatterns("/api/labels/**");
    }
}
