package codesquad.issueTracker.oauth.dto;

import com.fasterxml.jackson.annotation.JsonProperty;

public class OauthUser {

    private Long id;
    @JsonProperty("login")
    private String loginId;
    @JsonProperty("avatar_url")
    private String avatarUrl;
    private String name;

    private OauthUser() {
    }

    public OauthUser(Long id, String loginId, String avatarUrl, String name) {
        this.id = id;
        this.loginId = loginId;
        this.avatarUrl = avatarUrl;
        this.name = name;
    }

    public Long getId() {
        return id;
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

    public static OauthUser of (Long id, String loginId, String avatarUrl, String name) {
        return new OauthUser(id, loginId, avatarUrl, name);
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
