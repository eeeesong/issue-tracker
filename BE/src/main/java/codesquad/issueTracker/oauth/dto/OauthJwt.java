package codesquad.issueTracker.oauth.dto;

public class OauthJwt {
    public static String tokenType = "Bearer";
    public String jwt;

    public OauthJwt(String jwt) {
        this.jwt = jwt;
    }

    public String getJwt() {
        return jwt;
    }

    public String getTokenType() {
        return tokenType;
    }
}
