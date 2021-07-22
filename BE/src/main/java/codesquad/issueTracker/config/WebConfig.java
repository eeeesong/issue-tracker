package codesquad.issueTracker.config;

import codesquad.issueTracker.oauth.UserArgumentResolver;
import codesquad.issueTracker.oauth.interceptor.OauthInterceptor;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.method.support.HandlerMethodArgumentResolver;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.InterceptorRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

import java.util.List;

@Configuration
public class WebConfig implements WebMvcConfigurer {
    private final OauthInterceptor oauthInterceptor;
    private final UserArgumentResolver userArgumentResolver;

    public WebConfig(OauthInterceptor oauthInterceptor, UserArgumentResolver userArgumentResolver) {
        this.oauthInterceptor = oauthInterceptor;
        this.userArgumentResolver = userArgumentResolver;
    }

    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/**")
                .allowedOrigins("*")
                .allowedMethods("GET", "POST", "PUT", "DELETE");
    }

    @Override
    public void addInterceptors(InterceptorRegistry registry) {
        registry.addInterceptor(oauthInterceptor)
                .addPathPatterns("/api/labels/**")
                .addPathPatterns("/api/milestones/**")
                .addPathPatterns("/api/issues/**")
                .addPathPatterns("/api/comments/**");
    }

    @Override
    public void addArgumentResolvers(List<HandlerMethodArgumentResolver> resolvers) {
        resolvers.add(userArgumentResolver);
    }
}
