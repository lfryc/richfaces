/*
 * JBoss, Home of Professional Open Source
 * Copyright 2013, Red Hat, Inc. and individual contributors
 * by the @authors tag. See the copyright.txt in the distribution for a
 * full listing of individual contributors.
 *
 * This is free software; you can redistribute it and/or modify it
 * under the terms of the GNU Lesser General Public License as
 * published by the Free Software Foundation; either version 2.1 of
 * the License, or (at your option) any later version.
 *
 * This software is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU
 * Lesser General Public License for more details.
 *
 * You should have received a copy of the GNU Lesser General Public
 * License along with this software; if not, write to the Free
 * Software Foundation, Inc., 51 Franklin St, Fifth Floor, Boston, MA
 * 02110-1301 USA, or see the FSF site: http://www.fsf.org.
 */

RichFaces.QUnit.run(function() {
    module("richfaces-toggle-panel");

    test("TogglePanelItem test public methods", function () {
        var item = RichFaces.$('f:name1');

        ok(item, "item");
        equals(item.getName(), "name1", "item.getName()");

        var togglePanel = item.getTogglePanel();
        ok(togglePanel, item.getTogglePanel());
        equals(togglePanel.id, "f:panel", "togglePanel.id"); // see xhtml page definition

        ok(item.isSelected(), "item.isSelected()");
    });

    test("TogglePanelItem test events order", function () {
        var componentId = 'f:name1';
        var item = RichFaces.$(componentId);

        expect(2);
        var state = 1;
        var leave = RichFaces.Event.bindById(componentId, "__leave", function () {
            ok(state == 1, "leave handler invouked (state == 1)");
            state++;
        });

        item.__leave();

        var enter = RichFaces.Event.bindById(componentId, "__enter", function () {
            ok(state == 2, "enter handler invouked (state == 2)");
            state++;
        });

        item.__enter();

        RichFaces.Event.unbindById(componentId, "__leave", leave);
        RichFaces.Event.unbindById(componentId, "__enter", enter);
    });

    test("TogglePanelItem test cacelable of leave", function () {
        var componentId = 'f:name1';
        var item = RichFaces.$(componentId);

        expect(2);
        var state = 1;
        var leave = RichFaces.Event.bindById(componentId, "__leave", function () {
            ok(true, "leave handler invouked");

            return false;
        });

        ok(!item.__leave(), "!item.leave()");

        RichFaces.Event.bindById(componentId, "__leave", leave);
    });
});