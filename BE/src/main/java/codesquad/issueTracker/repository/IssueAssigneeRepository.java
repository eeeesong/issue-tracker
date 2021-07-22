package codesquad.issueTracker.repository;


import codesquad.issueTracker.domain.IssueAssignee;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface IssueAssigneeRepository extends JpaRepository<IssueAssignee, Long> {
    List<IssueAssignee> findByIssueId(Long id);
}
