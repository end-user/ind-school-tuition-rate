package gov.vermont.aoe.edqual.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
@Table(name = "comment")
public class Comment {
    @Id
    @Column(name = "id", nullable = false)
    private Long id;

    @Lob
    private String comment;

    @ManyToOne
    @JoinColumn(name = "entry_id")
    private AbstractLedgerEntry entry;
}