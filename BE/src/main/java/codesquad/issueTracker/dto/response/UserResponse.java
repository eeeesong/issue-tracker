package codesquad.issueTracker.dto.response;

import codesquad.issueTracker.domain.User;
import lombok.Getter;

@Getter
public class UserResponse {
    private final Long id;
    private final String name;
    private final String imageUrl;

    public UserResponse (User user) {
        id = user.getId();
        name = user.getName();
        imageUrl = user.getImageUrl();
    }
}
