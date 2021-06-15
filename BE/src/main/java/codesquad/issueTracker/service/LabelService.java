package codesquad.issueTracker.service;

import codesquad.issueTracker.Data;
import codesquad.issueTracker.domain.Label;
import codesquad.issueTracker.repository.LabelRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class LabelService {
    private final LabelRepository labelRepository;

    public LabelService(LabelRepository labelRepository) {
        this.labelRepository = labelRepository;
    }

    public Data findAll() {
        return Data.ok(labelRepository.findByDeleteIsFalse(), "Label");
    }

    public void creatLabel(Label label) {
        labelRepository.save(label);
    }

    @Transactional
    public Label updateLabel(Long id, Label updateLabel) {
        Label label = labelRepository.findById(id)
                .orElseThrow(() -> new NullPointerException("존재하지 않는 라벨입니다"));

        label.updateLabel(updateLabel);
        return labelRepository.save(label);
    }

    @Transactional
    public void deleteLabel(Long id) {
        Label label = labelRepository.findById(id)
                .orElseThrow(() -> new NullPointerException("존재하지 않는 라벨입니다"));
        label.delete();
        labelRepository.save(label);
    }
}
