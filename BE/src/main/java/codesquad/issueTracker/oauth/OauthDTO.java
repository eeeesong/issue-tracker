package codesquad.issueTracker.oauth;

import com.fasterxml.jackson.annotation.JsonProperty;

public class OauthDTO {
    private String jwt;
    private String avatarUrl;
    private String loginId;

    public OauthDTO(String jwt, String avatar_url, String login_id) {
        this.jwt = jwt;
        this.avatarUrl = avatar_url;
        this.loginId = login_id;
    }

    public String getJwt() {
        return jwt;
    }

    public String getAvatarUrl() {
        return avatarUrl;
    }

    public String getLoginId() {
        return loginId;
    }


}
