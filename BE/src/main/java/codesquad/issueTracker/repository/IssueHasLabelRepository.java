package codesquad.issueTracker.repository;

import codesquad.issueTracker.domain.IssueHasLabel;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface IssueHasLabelRepository extends JpaRepository<IssueHasLabel, Long> {
    List<IssueHasLabel> findByIssueId(Long issueId);
}
