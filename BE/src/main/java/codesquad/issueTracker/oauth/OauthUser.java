package codesquad.issueTracker.oauth;

import com.fasterxml.jackson.annotation.JsonProperty;

public class OauthUser {
    @JsonProperty("login")
    private String loginId;
    @JsonProperty("avatar_url")
    private String avatarUrl;

    public OauthUser() {
    }

    public String getLoginId() {
        return loginId;
    }

    public String getName() {
        return loginId;
    }

    public String getAvatarUrl() {
        return avatarUrl;
    }

    @Override
    public String toString() {
        return "OauthUser{" +
                "login='" + loginId + '\'' +
                ", name='" + loginId + '\'' +
                ", avatarUrl='" + avatarUrl + '\'' +
                '}';
    }
}
