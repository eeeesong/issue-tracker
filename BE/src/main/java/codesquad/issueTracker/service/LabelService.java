package codesquad.issueTracker.service;

import codesquad.issueTracker.domain.Issue;
import codesquad.issueTracker.domain.IssueHasLabel;
import codesquad.issueTracker.domain.Label;
import codesquad.issueTracker.repository.IssueHasLabelRepository;
import codesquad.issueTracker.repository.LabelRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;

@Service
public class LabelService {
    private final LabelRepository labelRepository;
    private final IssueHasLabelRepository issueHasLabelRepository;

    public LabelService(LabelRepository labelRepository, IssueHasLabelRepository issueHasLabelRepository) {
        this.labelRepository = labelRepository;
        this.issueHasLabelRepository = issueHasLabelRepository;
    }

    public List<Label> findAll() {
        return labelRepository.findByDeletedIsFalse();
    }

    public void creatLabel(Label label) {
        labelRepository.save(label);
    }

    @Transactional
    public Label updateLabel(Long id, Label updateLabel) {
        Label label = labelRepository.findByIdAndDeletedFalse(id)
                .orElseThrow(() -> new NullPointerException("존재하지 않는 라벨입니다"));

        label.updateLabel(updateLabel);
        return labelRepository.save(label);
    }

    @Transactional
    public void deleteLabel(Long id) {
        Label label = labelRepository.findByIdAndDeletedFalse(id)
                .orElseThrow(() -> new NullPointerException("존재하지 않는 라벨입니다"));
        label.delete();
        labelRepository.save(label);
    }

    public List<IssueHasLabel> makeIssueLabels(Issue issue, List<Long> labelIds) {
        List<IssueHasLabel> issueLabels = new ArrayList<>();

        labelIds.forEach(labelId -> {
            Label label = labelRepository.findByIdAndDeletedFalse(labelId).orElseThrow(NullPointerException::new);
            issueLabels.add(new IssueHasLabel(issue, label));
        });

        return issueHasLabelRepository.saveAll(issueLabels);
    }
}
