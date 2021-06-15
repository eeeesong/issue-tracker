package codesquad.issueTracker.oauth.dto;

import com.fasterxml.jackson.annotation.JsonProperty;

public class OauthUser {

    @JsonProperty("login")
    private String loginId;

    @JsonProperty("avatar_url")
    private String avatarUrl;

    private String name;

    private OauthUser() {
    }

    public String getLoginId() {
        return loginId;
    }

    public String getAvatarUrl() {
        return avatarUrl;
    }

    public String getName() {
        return name;
    }
}
