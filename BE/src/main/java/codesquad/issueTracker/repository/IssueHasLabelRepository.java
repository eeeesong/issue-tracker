package codesquad.issueTracker.repository;

import codesquad.issueTracker.domain.IssueHasLabel;
import org.springframework.data.jpa.repository.JpaRepository;

public interface IssueHasLabelRepository extends JpaRepository<IssueHasLabel, Long> {
}
