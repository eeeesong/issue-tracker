package codesquad.issueTracker.oauth.dto;

import com.fasterxml.jackson.annotation.JsonProperty;

public class OauthUser {

    @JsonProperty("login")
    private String loginId;

    private OauthUser() {
    }

    public String getLoginId() {
        return loginId;
    }
}
