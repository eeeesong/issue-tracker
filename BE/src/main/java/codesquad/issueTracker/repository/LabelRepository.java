package codesquad.issueTracker.repository;

import codesquad.issueTracker.domain.Label;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface LabelRepository extends JpaRepository<Label, Long> {
    List<Label> findAll();
    Optional<Label> findById(Long id);
    List<Label> findByDeleteIsFalse();
}
