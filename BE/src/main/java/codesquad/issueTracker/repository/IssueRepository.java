package codesquad.issueTracker.repository;

import codesquad.issueTracker.domain.Issue;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface IssueRepository extends JpaRepository<Issue, Long> {
    Optional<Issue> findByIdAndDeletedFalse(Long aLong);

    List<Issue> findByDeletedFalse();

    List<Issue> findByStatusTrue();

    List<Issue> findByStatusFalse();
}
