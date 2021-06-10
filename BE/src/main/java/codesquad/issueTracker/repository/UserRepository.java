package codesquad.issueTracker.repository;

import codesquad.issueTracker.domain.User;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepository {

    Optional<User> findById(Long id);

    User findByLoginId(String loginId);
}
