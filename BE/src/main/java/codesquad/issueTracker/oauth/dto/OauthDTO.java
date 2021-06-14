package codesquad.issueTracker.oauth.dto;

public class OauthDTO {
    private OauthJwt jwt;
    private String avatarUrl;
    private String loginId;

    public OauthDTO(OauthJwt jwt, String avatar_url, String login_id) {
        this.jwt = jwt;
        this.avatarUrl = avatar_url;
        this.loginId = login_id;
    }

    public OauthJwt getJwt() {
        return jwt;
    }

    public String getAvatarUrl() {
        return avatarUrl;
    }

    public String getLoginId() {
        return loginId;
    }
}
