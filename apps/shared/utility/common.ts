//return border class of selected builder element in sortable pane
export function getBorderClassForBuilderElement(builderElementSection: any) {
    if (builderElementSection.errorDetails && builderElementSection.errorDetails.length > 0) {
        return builderElementSection.isSelected ? 'red-border' : '';
    }
    return builderElementSection.isSelected ? 'green-border' : '';
}