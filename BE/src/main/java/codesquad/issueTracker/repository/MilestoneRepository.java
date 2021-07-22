package codesquad.issueTracker.repository;

import codesquad.issueTracker.domain.Milestone;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface MilestoneRepository extends JpaRepository<Milestone, Long> {
    List<Milestone> findByDeletedIsFalse();

    Optional<Milestone> findByIdAndDeletedFalse(Long id);
}
